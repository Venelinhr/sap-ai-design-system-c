const ValidationPipeline = require('../validation/run-validation');
const fs = require('fs');
const path = require('path');

/**
 * Simple Benchmark Runner
 * Runs validation on existing LLM outputs and generates benchmark results
 */

class BenchmarkRunner {
  constructor() {
    this.validationPipeline = new ValidationPipeline();
    this.resultsDir = path.join(__dirname, 'results');
    this.ensureResultsDir();
  }

  ensureResultsDir() {
    if (!fs.existsSync(this.resultsDir)) {
      fs.mkdirSync(this.resultsDir, { recursive: true });
    }
  }

  /**
   * Run benchmark on a single output file
   */
  runBenchmark(outputPath, modelName) {
    try {
      const output = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      const validation = this.validationPipeline.validate(output);

      const result = {
        model: modelName || 'unknown',
        timestamp: new Date().toISOString(),
        input_file: outputPath,
        validation: validation,
        meta: {
          design_system_version: '1.0.0',
          test_type: 'canonical'
        }
      };

      return result;
    } catch (error) {
      return {
        model: modelName || 'unknown',
        timestamp: new Date().toISOString(),
        error: error.message,
        validation: null
      };
    }
  }

  /**
   * Save benchmark result
   */
  saveResult(result) {
    const filename = `${result.model}-${Date.now()}.json`;
    const filepath = path.join(this.resultsDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(result, null, 2));
    return filepath;
  }

  /**
   * Generate leaderboard from results
   */
  generateLeaderboard() {
    const results = this.loadResults();
    const modelScores = {};

    // Aggregate scores by model
    for (const result of results) {
      if (result.validation && result.validation.score) {
        if (!modelScores[result.model]) {
          modelScores[result.model] = {
            scores: [],
            total: 0,
            count: 0
          };
        }
        modelScores[result.model].scores.push(result.validation.score.total);
        modelScores[result.model].total += result.validation.score.total;
        modelScores[result.model].count++;
      }
    }

    // Calculate averages
    const leaderboard = [];
    for (const model in modelScores) {
      const scores = modelScores[model].scores;
      const average = modelScores[model].total / modelScores[model].count;
      const variance = this.calculateVariance(scores, average);

      leaderboard.push({
        name: model,
        average_score: Math.round(average),
        variance: Math.round(variance),
        test_count: modelScores[model].count,
        scores: scores
      });
    }

    // Sort by average score
    leaderboard.sort((a, b) => b.average_score - a.average_score);

    return leaderboard;
  }

  /**
   * Calculate variance
   */
  calculateVariance(scores, mean) {
    if (scores.length === 0) return 0;
    const squaredDiffs = scores.map(score => Math.pow(score - mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b, 0) / scores.length;
    return avgSquaredDiff;
  }

  /**
   * Load all results
   */
  loadResults() {
    const results = [];
    if (!fs.existsSync(this.resultsDir)) {
      return results;
    }

    const files = fs.readdirSync(this.resultsDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const content = JSON.parse(fs.readFileSync(path.join(this.resultsDir, file), 'utf8'));
          results.push(content);
        } catch (error) {
          console.error(`Error loading ${file}: ${error.message}`);
        }
      }
    }

    return results;
  }

  /**
   * Save leaderboard
   */
  saveLeaderboard(leaderboard) {
    const filepath = path.join(__dirname, 'leaderboard.json');
    const data = {
      last_updated: new Date().toISOString(),
      models: leaderboard
    };
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    return filepath;
  }

  /**
   * Generate leaderboard report
   */
  generateLeaderboardReport(leaderboard) {
    const lines = [];
    
    lines.push('=== LLM-Ready Benchmark Leaderboard ===');
    lines.push(`Last Updated: ${new Date().toISOString()}`);
    lines.push('');
    
    if (leaderboard.length === 0) {
      lines.push('No benchmark results available.');
    } else {
      lines.push('Rank | Model            | Avg Score | Variance | Tests');
      lines.push('-----|------------------|-----------|----------|------');
      
      leaderboard.forEach((entry, index) => {
        lines.push(
          `${(index + 1).toString().padEnd(4)} | ` +
          `${entry.name.padEnd(16)} | ` +
          `${entry.average_score.toString().padEnd(9)} | ` +
          `${entry.variance.toString().padEnd(8)} | ` +
          `${entry.test_count}`
        );
      });
    }

    lines.push('');
    lines.push('LLM-Ready Threshold: Score ≥ 85');
    lines.push('Consistency Threshold: Variance ≤ 10');

    return lines.join('\n');
  }
}

// CLI interface
if (require.main === module) {
  const runner = new BenchmarkRunner();
  const command = process.argv[2];

  if (command === 'run' && process.argv[3]) {
    const outputPath = process.argv[3];
    const modelName = process.argv[4] || 'unknown';
    const result = runner.runBenchmark(outputPath, modelName);
    const savedPath = runner.saveResult(result);
    console.log(`Benchmark result saved to: ${savedPath}`);
  } else if (command === 'leaderboard') {
    const leaderboard = runner.generateLeaderboard();
    runner.saveLeaderboard(leaderboard);
    console.log(runner.generateLeaderboardReport(leaderboard));
  } else {
    console.log('Usage:');
    console.log('  node benchmark/run-benchmark.js run <output-file> [model-name]');
    console.log('  node benchmark/run-benchmark.js leaderboard');
  }
}

module.exports = BenchmarkRunner;

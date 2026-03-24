# Task Tracker CLI

Simple CLI task tracker built with Node.js and Commander.js.

## Installation

```bash
npm install
```

## Usage

### Add a task
```bash
node src/index.js add "Buy groceries"
# Output: Added: [1] Buy groceries
```

### List all tasks
```bash
node src/index.js list
# Output:
# [ ] 1. Buy groceries
# [x] 2. Walk the dog
```

### Mark a task as done
```bash
node src/index.js done 1
# Output: Completed: [1] Buy groceries
```

### Help
```bash
node src/index.js --help
```

## Data Storage

Tasks are stored in `tasks.json` in the project root directory.

## License

MIT

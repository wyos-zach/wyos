# Jest Setup Troubleshooting

## VS Code Integration

If you see errors in the VS Code Jest extension status bar:

1. **Red 'Jest' indicator with error about ts-node**:

   This occurs because the Jest extension can't find ts-node when parsing the TypeScript jest.config.ts file. The solution is in your VS Code settings:

   ```json
   "jest.jestCommandLine": "pnpm test --",
   "jest.nodeEnv": {
     "NODE_OPTIONS": "--require ts-node/register"
   }
   ```

2. **Orange 'Jest-WS' indicator with question marks**:

   This usually means the Jest extension is trying to discover tests but having trouble parsing some files. You can try:

   - Make sure the VS Code Jest extension is updated
   - Use the Jest extension commands to restart the Jest server
   - Check for any syntax errors in your test files

## Common Issues

1. **Missing JSX support in test files**:

   Make sure your mock components don't use JSX directly in `.ts` files. Either:

   - Use `.tsx` extension for files with JSX
   - Create object representations of React elements instead

2. **Module resolution errors**:

   If you see errors like "Cannot find module", check:

   - Path aliases are correctly configured in jest.config.ts
   - All dependencies are installed
   - The import path is correct

3. **Running tests in a specific file**:

   ```bash
   pnpm test -- path/to/file.test.tsx
   ```

## VSCode Jest Tips

1. Use the Jest Status bar to:

   - Run individual tests
   - Debug tests
   - See test status

2. Use "Jest: Start All Runners" command to start the Jest extension if it's not working

3. If tests pass in terminal but fail in VS Code, try restarting the Jest extension

# Debugging Guide for Tatame Control API

This guide explains various methods to debug your NestJS application.

## Table of Contents
1. [VS Code Debugging](#vs-code-debugging)
2. [Command Line Debugging](#command-line-debugging)
3. [Console Logging](#console-logging)
4. [Debugging Tests](#debugging-tests)
5. [Common Debugging Scenarios](#common-debugging-scenarios)
6. [Tips and Best Practices](#tips-and-best-practices)

---

## VS Code Debugging

### Setup
A `.vscode/launch.json` file has been created with pre-configured debugging options.

### Available Debug Configurations

#### 1. **Debug NestJS** (Recommended)
- **How to use:**
  1. Open the Run and Debug panel (Ctrl+Shift+D)
  2. Select "Debug NestJS" from the dropdown
  3. Press F5 or click the green play button
  4. Set breakpoints in your TypeScript files by clicking in the gutter (left of line numbers)
  5. The app will start and pause at your breakpoints

- **Features:**
  - Automatic restart on file changes
  - Source map support (debug TypeScript directly)
  - Integrated terminal output

#### 2. **Debug NestJS (Attach)**
- **How to use:**
  1. First, start the app manually: `npm run start:debug`
  2. Select "Debug NestJS (Attach)" configuration
  3. Press F5 to attach the debugger
  4. Set breakpoints and debug as normal

- **Use case:** When you want to start the app separately and attach the debugger later

#### 3. **Debug Jest Tests**
- **How to use:**
  1. Select "Debug Jest Tests" configuration
  2. Press F5
  3. Set breakpoints in your test files or source files
  4. All tests will run with debugging enabled

#### 4. **Debug Current Jest Test**
- **How to use:**
  1. Open the test file you want to debug
  2. Select "Debug Current Jest Test" configuration
  3. Press F5
  4. Only the current test file will run with debugging

### Setting Breakpoints
- **Line breakpoints:** Click in the gutter (left of line numbers) to set a red dot
- **Conditional breakpoints:** Right-click on a breakpoint → Edit Breakpoint → Add condition
- **Logpoints:** Right-click → Add Logpoint (logs without stopping execution)

### Debugging Controls
- **F5:** Continue/Pause
- **F10:** Step Over (execute current line)
- **F11:** Step Into (enter function calls)
- **Shift+F11:** Step Out (exit current function)
- **Ctrl+Shift+F5:** Restart debugging
- **Shift+F5:** Stop debugging

---

## Command Line Debugging

### Using the Built-in Script
```bash
npm run start:debug
```
This starts the app with Node.js inspector enabled on port 9229.

### Attaching Chrome DevTools
1. Start the app: `npm run start:debug`
2. Open Chrome and navigate to: `chrome://inspect`
3. Click "Open dedicated DevTools for Node"
4. Set breakpoints in the Sources tab
5. Your breakpoints will hit when the code executes

### Custom Port
If you need a different port:
```bash
node --inspect=0.0.0.0:9230 -r ts-node/register -r tsconfig-paths/register src/main.ts
```

---

## Console Logging

### Using NestJS Logger
```typescript
import { Logger } from '@nestjs/common';

export class YourService {
  private readonly logger = new Logger(YourService.name);

  someMethod() {
    this.logger.log('Info message');
    this.logger.error('Error message', 'Stack trace');
    this.logger.warn('Warning message');
    this.logger.debug('Debug message');
    this.logger.verbose('Verbose message');
  }
}
```

### Logging Levels
Control logging levels via environment variables:
```bash
# .env file
LOG_LEVEL=debug  # Options: error, warn, log, debug, verbose
```

### Console.log (Quick Debugging)
```typescript
console.log('Variable value:', variable);
console.log('Object:', JSON.stringify(object, null, 2));
console.table(arrayOfObjects); // Nice table format
```

---

## Debugging Tests

### Unit Tests
```bash
# Debug all tests
npm run test:debug

# Debug specific test file
npm run test:debug -- src/auth/auth.service.spec.ts
```

### E2E Tests
```bash
# Start app in debug mode first
npm run start:debug

# In another terminal, run e2e tests
npm run test:e2e
```

### VS Code Test Debugging
1. Use the "Debug Jest Tests" configuration
2. Or use the Test Explorer extension for a visual interface

---

## Common Debugging Scenarios

### 1. Debugging API Endpoints

**Example: Debugging the login endpoint**
```typescript
// In auth.controller.ts
@Post('login')
async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
  // Set breakpoint here
  console.log('Login DTO received:', loginDto);
  const result = await this.loginUseCase.execute(loginDto);
  // Set breakpoint here to inspect result
  return result;
}
```

**Steps:**
1. Set breakpoint in `auth.controller.ts` line 17
2. Start debugger (F5)
3. Make a POST request to `/auth/login`
4. Execution will pause at your breakpoint
5. Inspect variables in the Variables panel

### 2. Debugging Database Queries

**Enable TypeORM Query Logging:**
```typescript
// In data-source.ts
{
  logging: true,  // Logs all queries
  logger: 'advanced-console',  // Detailed query logs
}
```

**Or use TypeORM's query logging:**
```typescript
import { DataSource } from 'typeorm';

// In your service
const queryRunner = this.dataSource.createQueryRunner();
const result = await queryRunner.query('SELECT * FROM users WHERE id = $1', [userId]);
console.log('Query result:', result);
```

### 3. Debugging Dependency Injection Issues

**Check if services are properly injected:**
```typescript
constructor(
  @Inject(LOGIN_USE_CASE)
  private readonly loginUseCase: ILoginUseCase,
) {
  // Set breakpoint here to verify injection
  console.log('LoginUseCase injected:', !!this.loginUseCase);
}
```

### 4. Debugging Middleware/Interceptors

**Add logging to interceptors:**
```typescript
// In transform.interceptor.ts
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  const request = context.switchToHttp().getRequest();
  console.log('Request URL:', request.url);
  console.log('Request Body:', request.body);
  
  return next.handle().pipe(
    tap(data => console.log('Response:', data)),
  );
}
```

### 5. Debugging Validation Errors

**The ValidationPipe will automatically log validation errors**, but you can add custom handling:
```typescript
// In main.ts - already configured, but you can enhance it
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      console.log('Validation errors:', errors);
      return new BadRequestException(errors);
    },
  }),
);
```

---

## Tips and Best Practices

### 1. Use Conditional Breakpoints
Instead of logging, use conditional breakpoints:
- Right-click breakpoint → Edit Breakpoint
- Add condition: `userId === 'specific-id'`

### 2. Watch Expressions
In VS Code debugger:
- Add expressions to the Watch panel
- Monitor variable values without breakpoints
- Example: `user.email`, `response.statusCode`

### 3. Call Stack Navigation
- Use the Call Stack panel to see the execution path
- Click on any frame to see variables at that point
- Helps understand how you got to the current breakpoint

### 4. Debug Console
- Use the Debug Console to evaluate expressions
- Type variable names to see their values
- Execute code in the current context

### 5. Source Maps
- Already enabled in `tsconfig.json` (`"sourceMap": true`)
- Allows debugging TypeScript directly (not compiled JavaScript)

### 6. Environment Variables
Create a `.env` file for debugging:
```env
NODE_ENV=development
LOG_LEVEL=debug
PORT=3000
DATABASE_URL=postgresql://...
```

### 7. Network Debugging
- Use Postman, Insomnia, or VS Code REST Client extension
- Test API endpoints while debugging
- View request/response in the debugger

### 8. Database Debugging
- Use database GUI tools (pgAdmin, DBeaver, TablePlus)
- Monitor queries in real-time
- Compare expected vs actual data

### 9. Performance Debugging
```typescript
const startTime = Date.now();
// ... your code ...
const endTime = Date.now();
console.log(`Execution time: ${endTime - startTime}ms`);
```

### 10. Error Stack Traces
- Enable source maps for readable stack traces
- Use `Error.stack` to see full call stack
- Check the GlobalExceptionFilter for error handling

---

## Quick Reference

### Debugging Commands
```bash
# Start with debugger
npm run start:debug

# Run tests with debugger
npm run test:debug

# Regular development (no debugger)
npm run start:dev
```

### VS Code Shortcuts
- **F5:** Start/Continue debugging
- **F9:** Toggle breakpoint
- **F10:** Step over
- **F11:** Step into
- **Shift+F11:** Step out
- **Ctrl+Shift+F5:** Restart
- **Shift+F5:** Stop

### Useful Extensions
- **REST Client:** Test API endpoints from VS Code
- **Thunder Client:** Postman alternative in VS Code
- **Error Lens:** Shows errors inline
- **TypeScript Importer:** Auto-imports

---

## Troubleshooting

### Breakpoints Not Hitting
1. Ensure source maps are enabled (`tsconfig.json`)
2. Rebuild the project: `npm run build`
3. Check that you're debugging the correct file (not dist/)
4. Verify the debugger is attached (check Debug Console)

### Can't Attach Debugger
1. Check if port 9229 is available
2. Verify `start:debug` script is running
3. Try restarting VS Code
4. Check firewall settings

### Source Maps Not Working
1. Verify `"sourceMap": true` in `tsconfig.json`
2. Delete `dist/` folder and rebuild
3. Check that `.js.map` files exist in `dist/`

---

Happy Debugging! 🐛🔍


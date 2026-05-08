// export async function execPromise(command) {
//   // Dynamically import 'child_process'
//   const { exec } = await import('child_process');
//   return new Promise((resolve, reject) => {
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve({ stdout, stderr });
//       }
//     });
//   });
// }
/**
 * execPromise
 * -----------
 * A utility function that runs a shell command using Node.js
 * and returns the result as a Promise.
 *
 * Why?
 * ----
 * Normally, Node's `child_process.exec` uses callbacks.
 * This wrapper converts it into a Promise-based function,
 * making it easier to use with async/await.
 *
 * Example usage:
 * --------------
 * const result = await execPromise("ls -la");
 * console.log(result.stdout); // command output
 */
export async function execPromise(command) {
  // Dynamically import 'child_process' module (built into Node.js)
  // This avoids loading it until needed.
  const { exec } = await import("child_process");

  // Return a new Promise that resolves/rejects based on command result
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // If an error occurs (e.g., invalid command), reject the Promise
        reject(error);
      } else {
        // Otherwise, resolve with both stdout (output) and stderr (error logs)
        resolve({ stdout, stderr });
      }
    });
  });
}

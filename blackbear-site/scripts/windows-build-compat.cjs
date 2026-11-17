// Next writes parent and child segment directories concurrently. On this
// Windows machine recursive mkdir occasionally returns a transient EPERM.
// Serialize only generated-output directory creation and retry briefly.
if (process.platform === "win32") {
  const fs = require("node:fs");
  const path = require("node:path");
  const nativeMkdir = fs.promises.mkdir.bind(fs.promises);
  const output = path.resolve(process.cwd(), ".next").toLowerCase();
  let queue = Promise.resolve();
  fs.promises.mkdir = (directory, options) => {
    const target =
      typeof directory === "string"
        ? path.resolve(directory).toLowerCase()
        : "";
    if (
      !options?.recursive ||
      !(target === output || target.startsWith(output + path.sep))
    )
      return nativeMkdir(directory, options);
    const task = queue.then(async () => {
      for (let attempt = 0; ; attempt++) {
        try {
          return await nativeMkdir(directory, options);
        } catch (error) {
          if (
            attempt >= 4 ||
            !["EPERM", "EACCES", "EBUSY"].includes(error.code)
          )
            throw error;
          await new Promise((done) => setTimeout(done, 30 * (attempt + 1)));
        }
      }
    });
    queue = task.catch(() => {});
    return task;
  };
}

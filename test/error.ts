// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
let foo;

async function bar() {
  await console; // eslint-disable-line @typescript-eslint/await-thenable
  await bar();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bar();

import { Transform } from "stream";

console.log("Enter the data to be transformed: ");

const reverse = new Transform({
  readableObjectMode: true,
  
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().split("").reverse().join("") + "\n");
    callback();
  }
});

process.stdin.pipe(reverse).pipe(process.stdout);
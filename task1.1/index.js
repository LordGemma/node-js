process.stdin.resume();
console.log("Enter the data to be transformed: ");
process.stdin.on("data", function (data) {
  const string = reverse(data);
  process.stdout.write(string);
});

function reverse(data) {
  const string = data.toString();
  return string.split("").reverse().join("");
}

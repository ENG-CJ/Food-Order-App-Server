import moment from "moment";
import random from "random";
import simpleGit from "simple-git";
import jsonfile from "jsonfile";
const filePath = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment()
    .subtract(2, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();
  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(filePath, data, () => {
    simpleGit()
      .add([filePath])
      .commit(date, { "--date": date }, makeCommit.bind(this, --n));
  });
};
makeCommit(700);

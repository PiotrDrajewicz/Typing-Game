const SingleLetter = ({
  index,
  letter,
  splittedWord,
  splittedInput,
  color,
  lettersArr,
}) => {
  // const checkMatch = (index, splittedWord, splittedInput) => {
  //   if (splittedWord[index] === splittedInput[index]) {
  //     // console.log("green");
  //     return "letter-green";
  //   } else {
  //     // console.log("red");
  //     return "letter-red";
  //   }
  // };

  // const color = checkMatch(index, splittedWord, splittedInput);
  // console.log("nowy kolor: ", color);
  console.log("nowy kolor: ", color);
  console.log("lettersArr: ", lettersArr);

  return <h3 className={`single-letter ${color}`}>{letter}</h3>;
};

export default SingleLetter;

const SingleLetter = ({
  index,
  letter,
  splittedWord,
  splittedInput,
  colorClass,
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
  // console.log("nowy kolor: ", color);
  // console.log("lettersArr: ", lettersArr);
  // console.log(this.parentElement);

  return <h3 className={`single-letter ${colorClass}`}>{letter}</h3>;
};

export default SingleLetter;

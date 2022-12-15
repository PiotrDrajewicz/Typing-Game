const SingleLetter = ({
  index,
  letter,
  splittedWord,
  splittedInput,
  checkMatch,
}) => {
  const color = checkMatch(index, splittedWord, splittedInput);
  console.log("nowy kolor: ", color);

  return <h3>{letter}</h3>;
};

export default SingleLetter;

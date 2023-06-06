export function StarRating({ rating }) {
  const Stars = (rating) => {
    let result = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        result.push(<span class="fa fa-star checked"></span>);
      } else {
        result.push(<span class="fa fa-star"></span>);
      }
    }
    console.log(result);
    return result;
  };

  const resultElements = Stars(rating);

  return <div className="starRating"> {resultElements} </div>;
}

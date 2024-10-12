import { useBookStore } from "./../../store/bookStore";
import Slider from "./../../components/slider/Slider";
import Services from "./../../components/services/Services";
import HeadingTitle from "./../../components/heading-title/HeadingTitle";
import BookSlider from "./../../components/book-slider/BookSlider";

const HomePage = () => {
  const {  books } = useBookStore();


  return (
    <div>
      <Slider />
      <Services />
      <HeadingTitle title="Most gifted" />
      <BookSlider data={books} />
      <HeadingTitle title="Best  seller" />
      <BookSlider data={books} />
      <HeadingTitle title="Most wished for" />
      <BookSlider data={books} />
    </div>
  );
};

export default HomePage;

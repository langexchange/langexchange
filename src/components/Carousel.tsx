import { Image } from "antd";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import { AttachedFile } from "../services/post/postService";

const SampleNextArrow: React.FC = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        right: "24px",
        position: "absolute",
        height: "48px",
        width: "48px",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
    />
  );
};

const SamplePrevArrow: React.FC = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "24px",
        position: "absolute",
        zIndex: 2,
        height: "48px",
        width: "48px",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
    />
  );
};

interface CarouselProps {
  images?: AttachedFile[];
  videos?: AttachedFile[];
  type?: "normal" | "inModal";
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  videos,
  type = "normal",
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    adaptiveHeight: true,
    appendDots: (dots: any) => (
      <div
        style={{ position: "absolute", zIndex: 3, bottom: "8px" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
      </div>
    ),
  };

  return images ? (
    <>
      <div style={{ background: "#ebedf0" }}>
        <Slider {...settings}>
          {images.map((item, index) => (
            <div key={index} className="text-center px-4">
              <Image
                preview={type === "inModal"}
                src={item.url}
                className="w-100"
                width="auto"
                height="auto"
              />
            </div>
          ))}
          {videos?.map((item, index) => (
            <div key={index} className="text-center px-4">
              <ReactPlayer
                url={item.url}
                controls={true}
                width="100%"
                height="auto"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  ) : null;
};

export default Carousel;

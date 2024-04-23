import { Link, useNavigate } from "react-router-dom";
import { useImageState } from "../state/ImageState";
import { filterPickFixed } from "../data/functions/FilterImages";
import { useEffect, useMemo, useRef, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ImageMee } from "../components/layout/ImageMee";
import { FeedRead } from "../state/FeedRead";
import { useAccessCounter } from "../state/StateSet";

export default function Home() {
  const { current, month, total, date } = useAccessCounter();
  return (
    <>
      <HomeImage />
      <div className="topPage">
        <ul>
          <li>
            <Link to="/gallery">ギャラリー</Link>
          </li>
          <li>
            <Link to="/character">キャラクター</Link>
          </li>
          {/* <li>
            <Link to="/work">かつどう</Link>
          </li> */}
          <li>
            <Link to="/sound">おんがく</Link>
          </li>
          <li>
            <Link to="/info">じょうほう</Link>
          </li>
        </ul>
        <FeedRead />
        <div className="access-counter">
          <div>
            {date.getFullYear()}/{date.getMonth() + 1} で {current}ばんめぇの
            アクセス
          </div>
          <div>
            (こんげつ{month}、ごうけい{total})
          </div>
        </div>
      </div>
    </>
  );
}

export function HomeImage() {
  const { imageAlbumList } = useImageState();
  const images = useMemo(
    () => imageAlbumList.find(({ name }) => name === "art")?.list ?? [],
    [imageAlbumList]
  );
  const topImages = filterPickFixed({
    images,
    name: "topImage",
  });
  const [topImageState, setTopImage] = useState<MediaImageItemType>();
  const firstLoad = useRef(true);
  const currentTopImage = useRef<MediaImageItemType | null>(null);
  if (topImageState && currentTopImage) currentTopImage.current = topImageState;
  const topImage = currentTopImage.current;
  const setRndTopImage = () => {
    const curIndex = currentTopImage.current
      ? topImages.findIndex(
          (image) => image.src === currentTopImage.current?.src
        )
      : -1;
    let imageIndex = Math.floor(
      Math.random() * (topImages.length - (curIndex >= 0 ? 1 : 0))
    );
    if (curIndex >= 0 && curIndex <= imageIndex) imageIndex++;
    setTopImage(topImages[imageIndex]);
  };
  if (firstLoad.current && images.length > 0) {
    setRndTopImage();
    firstLoad.current = false;
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setRndTopImage();
    }, 10000);
    return () => clearInterval(timer);
  });

  return (
    <div className="HomeImage wide">
      {currentTopImage.current && topImage ? (
        <TransitionGroup className="wrapper">
          <CSSTransition key={currentTopImage.current.src || ""} timeout={750}>
            <ImageMee imageItem={topImage} loading="eager" className="image" />
          </CSSTransition>
        </TransitionGroup>
      ) : (
        <div className="dummy" />
      )}
    </div>
  );
}

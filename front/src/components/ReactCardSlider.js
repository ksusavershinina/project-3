import '../styles/slider.css';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';


const ReactCardSlider = (props) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 120;
  }

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 120;
  }

  return (
    <div id="main-slider-container">
      <MdKeyboardArrowLeft size={40} className="slider-icon left" onClick={slideLeft}/>
      <div id="slider">
        { 
        props.slides.map((slide, index) => {
            return(
              <div className="slider-card" key={index}>
                <div className="slider-card-image" style={{backgroundImage:`url(${slide.image})`, backgroundSize:`cover`}}></div>
              </div>
            )
            })
        }
      </div>
      <MdKeyboardArrowRight size={40} className="slider-icon right" onClick={slideRight}/>
    </div>
  )
}
export default ReactCardSlider;
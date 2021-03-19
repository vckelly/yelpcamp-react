import axios from 'axios';
import Campground from './Campground.jsx';

const getCampgrounds = async () => {
  try {
    const resp = await axios.get('http://localhost:5000/campgrounds');
    console.log(resp.data);
  } catch (err) {
      // Handle Error Here
    console.error(err);
  }
};

let campgrounds = getCampgrounds();

console.log("CAMPGROUNDS", campgrounds[0]);

function Campgrounds() {
  return (
    <div className="Campgrounds">
      <h1>Campgrounds!</h1>
      <div className="Campground">
        { campgrounds && campgrounds.map((camp) => (
            <Campground
              key={camp.id}
              campground={camp}
            />
          ))
        } 
      </div>
    </div>
  )
}

export default Campgrounds;

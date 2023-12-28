// // Menu.js

// import React from 'react';
// import "./menus.css"
// import menus from '../dummyData';// Import the menus array from your dummydata file

// class Menu extends React.Component {
//   render() {
//     return (
//       <div className="menu">
//         <header>
//           <div className="header">
//             <div className="carousel">
//               {menus.map((menu) => (
//                 <div key={menu._id} className="carousel--item card">
//                   <h1>
//                     <a href={`/menus/${menu._id}`} style={{ textDecoration: 'none' }}>
//                       <div className="food-items">
//                         <div className="details">
//                           <div className="details-sub">
//                             <h1>{menu.weekday}</h1>
//                             <p>Breakfast: {menu.breakfast}</p>
//                             <p>Lunch: {menu.lunch}</p>
//                             <p>Dinner: {menu.dinner}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </a>
//                   </h1>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </header>
//       </div>
//     );
//   }
// }

// export default Menu;
import React from 'react';
import './menus.css';
import menus from '../dummyData';
import Navigation from "../../Navigation";
import Footer from '../../Footer'
class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <Navigation />
        <header>
          <div className="header">
            <div className="carousel">
              {menus.map((menu) => (
                <div key={menu._id} className="carousel--item card">
                  <h1>
                    <a
                      href={`/menus/${menu._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="food-items">
                        <img src={menu.image} alt={menu.weekday} />
                        <div className="details">
                          <div className="details-sub">
                            <h1>{menu.weekday}</h1>
                            <p>Breakfast: {menu.breakfast}</p>
                            <p>Lunch: {menu.lunch}</p>
                            <p>Dinner: {menu.dinner}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </header>
       <Footer/>
      </div>
    );
  }
}

export default Menu;

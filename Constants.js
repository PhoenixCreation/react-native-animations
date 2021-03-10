import Temp from "./Screens/Temp";
import TaskList from "./Screens/TaskList"; // IDEA 1 implementation
import Info from "./Screens/Info"; // Info screen for this app users????
import CoffeeShop from "./Screens/CoffeeShop"; // A cafeteria shop app
import Vehical from "./Screens/Vehical"; // Vehical(car) showcase app design
import Snapchat from "./Screens/Snapchat"; // Snapchat stories translation...
import Login from "./Screens/Login"; // A login animation like door opening....
import SvgWithScrollView from "./Screens/SvgWithScrollView"; // Animation with scroll and svg....
import SvgAnimations from "./Screens/SvgAnimations"; // Svg animation with wave and timing......
import Cards from "./Screens/Cards"; // Card based animations....
import StrokeAnimation from "./Extra/StrokeAnimation"; // Text to svg animations.....
import SpotTube from "./Screens/SpotTube"; // IDEA 2 implementation

// IDEA: 1. Create a todo(CALENDER) app. Maybe if possible try to create a FULL STACK app.
// IDEA: 2. Create a music and video playing app. Combine SPOTIFY and YOUTUBE transitions.

export const SCREENS = [
  { name: "Info", component: Info },
  { name: "CoffeeShop", component: CoffeeShop },
  { name: "Vehical", component: Vehical },
  { name: "Login", component: Login },
  { name: "SpotTube", component: SpotTube },
  { name: "Snapchat", component: Snapchat },
  { name: "Cards", component: Cards },
  { name: "TaskList", component: TaskList },
  { name: "SvgWithScrollView", component: SvgWithScrollView },
  { name: "SvgAnimations", component: SvgAnimations },
  { name: "StrokeAnimation", component: StrokeAnimation },
  //Add above this line....temp should always be at the end.
  { name: "Temp", component: Temp },
];

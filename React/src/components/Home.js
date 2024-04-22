// /*
// Goal of React:
//   1. React will retrieve GitHub created and closed issues for a given repository and will display the bar-charts 
//      of same using high-charts        
//   2. It will also display the images of the forecasted data for the given GitHub repository and images are being retrieved from 
//      Google Cloud storage
//   3. React will make a fetch api call to flask microservice.
// */

// // Import required libraries
// import * as React from "react";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import AppBar from "@mui/material/AppBar";
// import CssBaseline from "@mui/material/CssBaseline";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// // Import custom components
// import BarCharts from "./BarCharts";
// import Loader from "./Loader";
// import { ListItemButton } from "@mui/material";

// const drawerWidth = 240;
// // List of GitHub repositories
// const repositories = [
//   {
//     key: "openai/openai-cookbook",
//     value: "Openai Cookbook",
//     images: [
      
//       { url: "./logo192.png", title: "Title 11" },
//       { url: "./logo192.png", title: "Title 2" },
      
//     ],
//   },
//   {
//     key: "elastic/elasticsearch",
//     value: "Elasticsearch",
//     images: [
//       { url: "/static/forecast_plot-8.3.png", title: "Title 1" },
//       { url: "/static/forecast_plot-8.4.png", title: "Title 2" },
//     ],
//   },
//   // Add more repositories with their image URLs and titles
// ];

// export default function Home() {
//   /*
//   The useState is a react hook which is special function that takes the initial 
//   state as an argument and returns an array of two entries. 
//   */
//   /*
//   setLoading is a function that sets loading to true when we trigger flask microservice
//   If loading is true, we render a loader else render the Bar charts
//   */
//   const [loading, setLoading] = useState(true);
//   /* 
//   setRepository is a function that will update the user's selected repository such as Angular,
//   Angular-cli, Material Design, and D3
//   The repository "key" will be sent to flask microservice in a request body
//   */
//   const [repository, setRepository] = useState({
//     key: "angular/angular",
//     value: "Angular",
//   });
//   /*
  
//   The first element is the initial state (i.e. githubRepoData) and the second one is a function 
//   (i.e. setGithubData) which is used for updating the state.

//   so, setGitHub data is a function that takes the response from the flask microservice 
//   and updates the value of gitHubrepo data.
//   */
//   const [githubRepoData, setGithubData] = useState([]);
//   // Updates the repository to newly selected repository
//   const eventHandler = (repo) => {
//     setRepository(repo);
//   };

//   /* 
//   Fetch the data from flask microservice on Component load and on update of new repository.
//   Everytime there is a change in a repository, useEffect will get triggered, useEffect inturn will trigger 
//   the flask microservice 
//   */
//   React.useEffect(() => {
//     // set loading to true to display loader
//     setLoading(true);
//     const proxy = "https://flask1-ftwyhufr2a-uc.a.run.app"
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Append the repository key to request body
//       body: JSON.stringify({ repository: repository.key }),
//     };

//     /*
//     Fetching the GitHub details from flask microservice
//     The route "/api/github" is served by Flask/App.py in the line 53
//     @app.route('/api/github', methods=['POST'])
//     Which is routed by setupProxy.js to the
//     microservice target: "your_flask_gcloud_url"
//     */
//     fetch(proxy+"/api/github", requestOptions)
//       .then((res) => res.json())
//       .then(
//         // On successful response from flask microservice
//         (result) => {
//           // On success set loading to false to display the contents of the resonse
//           setLoading(false);
//           // Set state on successfull response from the API
//           setGithubData(result);
//         },
//         // On failure from flask microservice
//         (error) => {
//           // Set state on failure response from the API
//           console.log(error);
//           // On failure set loading to false to display the error message
//           setLoading(false);
//           setGithubData([]);
//         }
//       );
//   }, [repository]);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       {/* Application Header */}
//       <AppBar
//         position="fixed"
//         sx={{
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           backgroundColor: "Coral",
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Forecasting Timeseries
//           </Typography>

//           <div
//             style={{ display: "flex", marginLeft: "100px", cursor: "pointer" }}
//           >
//             <div color="primary" variant="contained">
//               <a href="/" style={{ color: "white" }}>
//                 Forecast
//               </a>
//             </div>
//             <div
//               color="primary"
//               variant="contained"
//               style={{ marginLeft: "10px", cursor: "pointer" }}
//             >
//               <a href="/stats" style={{ color: "white" }}>
//                 Statistics
//               </a>
//             </div>
//           </div>
//         </Toolbar>
//       </AppBar>
//       {/* Left drawer of the application */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: "auto" }}>
//           <List>
//             {/* Iterate through the repositories list */}
//             {repositories.map((repo) => (
//               <ListItem
//                 button
//                 key={repo.key}
//                 onClick={() => eventHandler(repo)}
//                 disabled={loading && repo.value !== repository.value}
//               >
//                 <ListItemButton selected={repo.value === repository.value}>
//                   <ListItemText primary={repo.value} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//   <Toolbar />
//   {/* Render loader component if loading is true else render charts and images */}
//   {loading ? (
//     <Loader />
//   ) : (
    
//       <div>
//         {repositories.map((repo) => (
//           <div key={repo.key} style={{ display: repository.key === repo.key ? 'block' : 'none' }}>
//             <Typography variant="h4">{repo.value}</Typography>
//             <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//               {repo.images.slice(0, 10).map((image, index) => (
//                 <div key={index} style={{ marginRight: "20px", marginBottom: "20px" }}>
//                   <img src={`/${image.url}`} alt={image.title} style={{ maxWidth: "200px" }} />
//                   <Typography variant="subtitle1">{image.title}</Typography>
//                 </div>
//               ))}
//             </Box>
//           </div>
//         ))}
//       </div>
//   )}
// </Box>

//     </Box>
//   );
// }


/*
Goal of React:
  1. React will retrieve GitHub created and closed issues for a given repository and will display the bar-charts 
     of same using high-charts        
  2. It will also display the images of the forecasted data for the given GitHub repository and images are being retrieved from 
     Google Cloud storage
  3. React will make a fetch api call to flask microservice.
*/

// Import required libraries
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// Import custom components
import BarCharts from "./BarCharts";
import Loader from "./Loader";
import { ListItemButton } from "@mui/material";

const drawerWidth = 240;
// List of GitHub repositories
const repositories = [
  {
    key: "Facebook/Prophet",
    value: "Prophet",
    images: [
      { url: "./static/forecast_plot-8.1.png", title: "The day of the week maximum number of issues created" },
      { url: "./static/forecast_plot-8.2.png", title: "The day of the week maximum number of issues closed" },
      { url: "./static/forecast_plot-8.3.png", title: "The month of the year that has maximum number of issues closed" },
      { url: "./static/forecast_plot-8.4.png", title: "Plot the created issues forecast" },
      { url: "./static/forecast_plot-8.5.png", title: "Plot the closed issues forecast" },
      { url: "./static/forecast_plot-8.6.png", title: "Plot the pulls forecast" },
      { url: "./static/forecast_plot-8.7.png", title: "Plot the commits forecast" },
      { url: "./static/forecast_plot-8.8.png", title: "Plot the branches forecast" },
      { url: "./static/forecast_plot-8.10.png", title: "Plot the releases forecast."}
    ],
  },
  {
    key: "TensorFlow/Keras LSTM",
    value: "LSTM",
    images: [
      { url: "./static/forecast_plot9.1.png", title: "The day of the week maximum number of issues created" },
      { url: "./static/forecast_plot9.2.png", title: "The day of the week maximum number of issues closed" },
      { url: "./static/forecast_plot-9.3.png", title: "The month of the year that has maximum number of issues closed" },
      { url: "./static/forecast_plot9.4.png", title: "Plot the created issues forecast" },
      { url: "./static/forecast_plot9.5.png", title: "Plot the closed issues forecast" },
      { url: "./static/forecast_plot9.6.png", title: "Plot the pulls forecast" },
      { url: "./static/forecast_plot9.7.png", title: "Plot the commits forecast" },
      { url: "./static/forecast_plot9.8.png", title: "Plot the branches forecast" },
      { url: "./static/forecast_plot9.10.png", title: "Plot the releases forecast."}
    ],
  },
  {
    key: "StatsModel",
    value: "Stats",
    images: [
      { url: "./static/forecast_figure101.png", title: "The day of the week maximum number of issues created" },
      { url: "./static/forecast_figure102.png", title: "The day of the week maximum number of issues closed" },
      { url: "./static/forecast_figure103.png", title: "The month of the year that has maximum number of issues closed" },
      { url: "./static/forecast_figure104.png", title: "Plot the created issues forecast" },
      { url: "./static/forecast_figure105.png", title: "Plot the closed issues forecast" },
      { url: "./static/forecast_figure106.png", title: "Plot the pulls forecast" },
      { url: "./static/forecast_figure107.png", title: "Plot the commits forecast" },
      { url: "./static/forecast_figure108.png", title: "Plot the branches forecast" },
      { url: "./static/forecast_figure1010.png", title: "Plot the releases forecast."}
    ],
  },
];

export default function Home() {
  /*
  The useState is a react hook which is special function that takes the initial 
  state as an argument and returns an array of two entries. 
  */
  /*
  setLoading is a function that sets loading to true when we trigger flask microservice
  If loading is true, we render a loader else render the Bar charts
  */
  const [loading, setLoading] = useState(true);
  /* 
  setRepository is a function that will update the user's selected repository such as Angular,
  Angular-cli, Material Design, and D3
  The repository "key" will be sent to flask microservice in a request body
  */
  const [repository, setRepository] = useState({
    key: "angular/angular",
    value: "Angular",
  });
  /*
  
  The first element is the initial state (i.e. githubRepoData) and the second one is a function 
  (i.e. setGithubData) which is used for updating the state.

  so, setGitHub data is a function that takes the response from the flask microservice 
  and updates the value of gitHubrepo data.
  */
  const [githubRepoData, setGithubData] = useState([]);
  // Updates the repository to newly selected repository
  const eventHandler = (repo) => {
    setRepository(repo);
  };

  /* 
  Fetch the data from flask microservice on Component load and on update of new repository.
  Everytime there is a change in a repository, useEffect will get triggered, useEffect inturn will trigger 
  the flask microservice 
  */
  React.useEffect(() => {
    // set loading to true to display loader
    setLoading(true);
    const proxy = "https://flask1-ftwyhufr2a-uc.a.run.app"
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Append the repository key to request body
      body: JSON.stringify({ repository: repository.key }),
    };

    /*
    Fetching the GitHub details from flask microservice
    The route "/api/github" is served by Flask/App.py in the line 53
    @app.route('/api/github', methods=['POST'])
    Which is routed by setupProxy.js to the
    microservice target: "your_flask_gcloud_url"
    */
    fetch(proxy+"/api/github", requestOptions)
      .then((res) => res.json())
      .then(
        // On successful response from flask microservice
        setTimeout(() => {
          // On success set loading to false to display the contents of the resonse
          setLoading(false);
          // Set state on successfull response from the API
          setGithubData(setTimeout);
        },200000000000),
        // On failure from flask microservice
        (error) => {
          // Set state on failure response from the API
          console.log(error);
          // On failure set loading to false to display the error message
          setLoading(false);
          setGithubData([]);
        }
      );
  }, [repository]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Application Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "Coral",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Forecasting Timeseries
          </Typography>

          <div
            style={{ display: "flex", marginLeft: "100px", cursor: "pointer" }}
          >
            <div color="primary" variant="contained">
              <a href="/" style={{ color: "white" }}>
                Forecast
              </a>
            </div>
            <div
              color="primary"
              variant="contained"
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              <a href="/stats" style={{ color: "white" }}>
                Statistics
              </a>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {/* Left drawer of the application */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* Iterate through the repositories list */}
            {repositories.map((repo) => (
              <ListItem
                button
                key={repo.key}
                onClick={() => eventHandler(repo)}
                disabled={loading && repo.value !== repository.value}
              >
                <ListItemButton selected={repo.value === repository.value}>
                  <ListItemText primary={repo.value} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* Render loader component if loading is true else render charts and images */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {repositories.map((repo) => (
              <div key={repo.key} style={{ display: repository.key === repo.key ? 'block' : 'none' }}>
                <Typography variant="h4">{repo.value}</Typography>
                {repo.images.slice(0, 10).map((image, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <img src={`/${image.url}`} alt={image.title} style={{ maxWidth: "1200px" }} />
                    <Typography variant="subtitle1" sx={{textAlign: "center"}}>{image.title}</Typography>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
}

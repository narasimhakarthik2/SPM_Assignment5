import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { ListItemButton } from "@mui/material";
import Loader from "./Loader";
import BarCharts from "./BarCharts";
import LineCharts from "./LineCharts";
import StackedBarCharts from "./StackedBarChart";
import Divider from "@mui/material/Divider";

export default function Stats() {
  const [loading, setLoading] = useState(false);
  const drawerWidth = 240;
  const [listItem, setListItem] = useState({
    key: "stars_forks",
    value: "Stars and Forks",
  });
  const [githubRepoData, setGithubData] = useState([]);
  const listItems = [
    { key: "stars_forks", value: "Stars and Forks" },
    { key: "all_issues", value: "All Issues" },
    { key: "issues_created_closed", value: "Issues Created & Closed" },
    { key: "issues_created_every_month", value: "Issues created every month" },
    {
      key: "issues_closed_for_every_week",
      value: "Issues closed for every week",
    },
  ];

  const eventHandler = (repo) => {
    setListItem(repo);
  };

  React.useEffect(() => {
    setLoading(true);

    const proxy = "https://flask1-ftwyhufr2a-uc.a.run.app"

    if (listItem.key === "stars_forks") {
      fetch(proxy+"/api/github/stars_forks")
        .then((response) => response.json())
        .then((data) => {
          setGithubData(data);
          setLoading(false);
        });
    }

    if (listItem.key === "all_issues") {
      fetch(proxy+"/api/github/stats/issues/question5")
        .then((response) => response.json())
        .then((data) => {
          setGithubData(data);
          setLoading(false);
        });
    }

    if (listItem.key === "issues_created_closed") {
      fetch(proxy+"/api/github/stats/issues/question10")
        .then((response) => response.json())
        .then((data) => {
          setGithubData(data.series);
          setLoading(false);
        });
    }

    if (listItem.key === "issues_created_every_month") {
      fetch(proxy+"/api/github/stats/issues/question6")
        .then((response) => response.json())
        .then((data) => {
          setGithubData(data);
          setLoading(false);
        });
    }

    if (listItem.key === "issues_closed_for_every_week") {
      fetch(proxy+"/api/github/stats/issues/question9")
        .then((response) => response.json())
        .then((data) => {
          setGithubData(data);
          setLoading(false);
        });
    }
  }, [listItem]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
      </Box>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "Coral",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Repository Statistics
          </Typography>

          <div
            style={{ display: "flex", marginLeft: "100px", cursor: "pointer" }}
          >
            <div color="primary" variant="contained">
              <a href="/" style={{ color: "white" }}>
                Forcast
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
            {/* Iterate through the listItems list */}
            {listItems.map((repo) => (
              <ListItem
                button
                key={repo.key}
                onClick={() => eventHandler(repo)}
                disabled={loading && repo.value !== listItem.value}
              >
                <ListItemButton selected={repo.value === listItem.value}>
                  <ListItemText primary={repo.value} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Render the below element if the listItem.key === stars_forks */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {loading ? (
          <Loader />
        ) : (
          <div>
            {listItem.key === "stars_forks" && (
              <div>
                <h3>Stars and Forks</h3>
                <BarCharts
                  title={`Stars values for all the 15 repositories`}
                  data={githubRepoData?.stars}
                />
                <Divider
                  sx={{ borderBlockWidth: "3px", borderBlockColor: "#FFA500" }}
                />
                <BarCharts
                  title={`Fork values for all the 15 repositories`}
                  data={githubRepoData?.forks}
                />
              </div>
            )}

            {listItem.key === "all_issues" && (
              <div>
                <h3>All Issues</h3>
                <LineCharts
                  title={`Issues values for all the 15 repositories`}
                  data={githubRepoData}
                />
                <Divider
                  sx={{ borderBlockWidth: "3px", borderBlockColor: "#FFA500" }}
                />
              </div>
            )}

            {listItem.key === "issues_created_closed" && (
              <div>
                <h3>Issues Created & Closed</h3>
                <StackedBarCharts
                  title={`Issues Created and Closed values for all the 15 repositories`}
                  data={githubRepoData}
                />
                <Divider
                  sx={{ borderBlockWidth: "3px", borderBlockColor: "#FFA500" }}
                />
              </div>
            )}

            {listItem.key === "issues_created_every_month" && (
              <div>
                <h3>Issues created for last month</h3>
                <BarCharts
                  title={`Issues created for last months`}
                  data={githubRepoData[1]}
                />
                <Divider
                  sx={{ borderBlockWidth: "3px", borderBlockColor: "#FFA500" }}
                />
                <h3>Issues created for two months</h3>
                <BarCharts
                  title={`Issues created for two months`}
                  data={githubRepoData[2]}
                />
              </div>
            )}

            {listItem.key === "issues_closed_for_every_week" && (
              <div>
                <h3>Issues closed for last week</h3>
                <BarCharts
                  title={`Issues closed for week 1`}
                  data={githubRepoData[1]}
                />
                <Divider
                  sx={{ borderBlockWidth: "3px", borderBlockColor: "#FFA500" }}
                />
                <h3>Issues closed for last week</h3>
                <BarCharts
                  title={`Issues closed for week 2`}
                  data={githubRepoData[2]}
                />
                <Divider
                  sx={{ borderBlockWidth: "3px", borderBlockColor: "#FFA500" }}
                />
                <h3>Issues closed for last week</h3>
                <BarCharts
                  title={`Issues closed for week 3`}
                  data={githubRepoData[3]}
                />
                <Divider
                  sx={{ borderBlockWidth: "3px", borderBlockColor: "#FFA500" }}
                />
                <h3>Issues closed for last week</h3>
                <BarCharts
                  title={`Issues closed for week 4`}
                  data={githubRepoData[4]}
                />
                <Divider
                  sx={{ borderBlockWidth: "3px", borderBlockColor: "#FFA500" }}
                />
                <h3>Issues closed for last week</h3>
                <BarCharts
                  title={`Issues closed for week 5`}
                  data={githubRepoData[5]}
                />
                <Divider
                  sx={{ borderBlockWidth: "3px", borderBlockColor: "#FFA500" }}
                />
                <h3>Issues closed for last week</h3>
                <BarCharts
                  title={`Issues closed for week 6`}
                  data={githubRepoData[6]}
                />
                <Divider
                  sx={{ borderBlockWidth: "3px", borderBlockColor: "#FFA500" }}
                />
                <h3>Issues closed for last week</h3>
                <BarCharts
                  title={`Issues closed for week 7`}
                  data={githubRepoData[7]}
                />
              </div>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
}
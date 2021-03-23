import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LinksPage } from "./pages/LinksPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { CoordinatesDetailPage } from "./pages/CoordinatesDetail";
import { AuthPage } from "./pages/AuthPage";
import { AnalysisPage } from "./pages/AnalysisPage";
import { MapPage } from "./pages/MapPage";
import { ImageUploadPage } from "./pages/ImageUploadPage";
import { WeatherPage } from "./pages/WeatherPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/imgUpload" exact>
          <ImageUploadPage />
        </Route>
        <Route path="/map" exact>
          <MapPage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/coordinatesDetail/:id">
          <CoordinatesDetailPage />
        </Route>
        <Route path="/analysis" exact>
          <AnalysisPage />
        </Route>
        <Route path="/weather/:id">
          <WeatherPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

import React, { useState } from "react";
import Schema from "./Schema";
import Type from "./Type";
import Focus from "./Focus";
import Search from "./Search";
import Statistics from "./Statistics";
import ClassHierarchy from "./ClassHierarchy";
import LeafMap from "./LeafMap";
import QueryEndpoint from "./QueryEndpoint";
import ItemList from "./ItemList";
import ItemDescription from "./ItemDescription";
import Video from "./Video";
import HelperUserGuide from "./HelperUserGuide";

function Layout(layout) {
  // Destructuring the variables passed down from the parent component into their own variables
  const { topLeft, topRight, bottomLeft, bottomRight } = layout;

  // Variable that is used to transfer data between different quadrants
  const [data, setData] = useState();
  const [bindings, setBindings] = useState();
  const [typeIsPending, setTypeIsPending] = useState(false);
  const [nodesIsPending, setNodesIsPending] = useState(false);
  const [coordinates, setCoordinates] = useState([39.78171, -84.063274]);
  const [dataFromType, setDataFromType] = useState();
  const [connections, setConnections] = useState();
  const [videoId, setVideoId] = useState("xc32OQoYvOw");

  const [itemInVideoData, setItemInVideoData] = useState([
    {
      name: "Please Press Pause Button to ",
      summary: "Lorem Ipsum",
      description:
        "Details of the topics will be extracted here, please pause the video and press the topic name in item list.",
    },
    {
      name: "to View the Topics on Screen !",
      summary: "Canterbury Tales",
      description:
        "Details of the topics will be extracted here, please pause the video and press the topic name in item list.",
    },
  ]);

  const [itemDescriptionName, setItemDescriptionName] = useState();
  const [itemDescriptionBody, setItemDescriptionBody] = useState();
  const [itemDescriptionReferences, setItemDescriptionReferences] = useState();
  const [selected, setSelected] = useState();
  console.log(
    itemDescriptionBody,
    "this is the item description body in layout",
  );
  // Set view components equal to a variable
  const type = (
    <div className="full-table" key={"type"}>
      <Type
        data={data}
        bindings={bindings}
        typeIsPending={typeIsPending}
        setCoordinates={setCoordinates}
        endpoint={layout.endpoint}
        setDataFromType={setDataFromType}
        selected={selected}
      ></Type>
    </div>
  );

  const schema = (
    <div className="view-full" key={"schema"}>
      <Schema
        bindings={bindings}
        data={data}
        setData={setData}
        setTypeIsPending={setTypeIsPending}
        endpoint={layout.endpoint}
        connections={connections}
        nodesIsPending={nodesIsPending}
        selected={selected}
        setSelected={setSelected}
      ></Schema>
    </div>
  );

  const focus = (
    <div className="full-table" key={"focus"}>
      <Focus dataFromType={dataFromType}></Focus>
    </div>
  );

  const classHierarchy = (
    <div className="quadrant" key={"classHierarchy"}>
      <ClassHierarchy endpoint={layout.endpoint}></ClassHierarchy>
    </div>
  );

  const statistics = (
    <div className="full-table" key={"statistics"}>
      <Statistics></Statistics>
    </div>
  );

  const search = (
    <div className="quadrant" key={"search"}>
      <Search
        bindings={bindings}
        setBindings={setBindings}
        endpoint={layout.endpoint}
        setConnections={setConnections}
      ></Search>
    </div>
  );

  const map = (
    <div className="view-full" key={"map"}>
      <LeafMap coordinates={coordinates} zoomLevel={layout.zoomLevel}></LeafMap>
    </div>
  );

  const itemsInVideoList = (
    <div className="full-table" key={"itemsInVideoList"}>
      <ItemList
        itemData={itemInVideoData}
        setItemDescriptionName={setItemDescriptionName}
        setItemDescriptionBody={setItemDescriptionBody}
        setItemDescriptionReferences={setItemDescriptionReferences}
      ></ItemList>
    </div>
  );

  const itemInVideoDescription = (
    <div
      className="quadrant"
      key={"itemInVideoDescription"}
      style={{ overflowY: "scroll" }}
    >
      <ItemDescription
        itemName={itemDescriptionName}
        itemDescription={itemDescriptionBody}
        itemDescriptionReferences={itemDescriptionReferences}
        videoId={videoId}
      ></ItemDescription>
    </div>
  );

  const video = (
    <div className="quadrant" key={"video"}>
      <Video
        setItemInVideoData={setItemInVideoData}
        setVideoId={setVideoId}
      ></Video>
    </div>
  );

  const empty = (
    <div className="quadrant" key={"empty"}>
      <HelperUserGuide> </HelperUserGuide>
    </div>
  );

  // Array that holds view data to be mapped through for rendering
  const views = [
    { viewString: "Type", viewComponent: type },
    { viewString: "Schema", viewComponent: schema },
    { viewString: "Focus", viewComponent: focus },
    { viewString: "Class Hierarchy", viewComponent: classHierarchy },
    { viewString: "Statistics", viewComponent: statistics },
    { viewString: "Search", viewComponent: search },
    { viewString: "Map", viewComponent: map },
    { viewString: "Item List", viewComponent: itemsInVideoList },
    { viewString: "Item Description", viewComponent: itemInVideoDescription },
    { viewString: "Video", viewComponent: video },
    { viewString: "Empty", viewComponent: empty },
  ];

  return (
    <div className={`gridlayout ${layout.theme}`}>
      {/* Logic for which view to render in the top left qudrant */}
      {views.map((view) => topLeft === view.viewString && view.viewComponent)}

      {/* Logic for which view to render in the top right qudrant */}
      {views.map((view) => topRight === view.viewString && view.viewComponent)}

      {/* Logic for which view to render in the bottom left qudrant */}
      {views.map(
        (view) => bottomLeft === view.viewString && view.viewComponent,
      )}

      {/* Logic for which view to render in the bottom right qudrant */}
      {views.map(
        (view) => bottomRight === view.viewString && view.viewComponent,
      )}
      <QueryEndpoint
        setBindings={setBindings}
        endpoint={layout.endpoint}
        setConnections={setConnections}
        setNodesIsPending={setNodesIsPending}
      ></QueryEndpoint>
    </div>
  );
}

export default Layout;

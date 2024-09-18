
## Key Features

- **Flexible Layout:** Dynamically render components in different quadrants based on the layout configuration.
- **State Management:** Use React's `useState` to share data between components and handle interactions.
- **Data Fetching:** Fetch data from an external SPARQL endpoint and propagate it across multiple views.
- **Interactive Map:** Display a map using LeafMap that updates coordinates dynamically.
- **Modular Design:** Includes reusable components like Type, Schema, Search, Focus, and more for displaying various types of data.

## Components

- **Type:** Displays data of a specific type. Updates map coordinates and passes data to other components.
- **Schema:** Visualizes the schema or structure of data. It fetches data from an endpoint and updates the view.
- **Focus:** Displays details based on data fetched by Type.
- **Class Hierarchy:** Shows a hierarchical view of classes or categories.
- **Search:** Allows searching through the data and updating results in other components.
- **Statistics:** Displays statistical information about the data.
- **LeafMap:** Displays a map with the ability to update based on coordinates.
- **DetailedInfoDisplay:** Shows detailed information about selected data from Type.
- **ShortcutDisplay:** Displays shortcuts for navigating the data.
- **QueryEndpoint:** Handles fetching data from an external SPARQL endpoint.

## How It Works

- **Dynamic Rendering:** The layout is determined by the configuration passed as props to the `Layout` component. Each quadrant (top-left, top-right, bottom-left, bottom-right) will render a view selected from the available components.
- **State Sharing:** The state is used to transfer data between components, such as sharing search results between the Search and Type components or updating coordinates in LeafMap.
- **Data Fetching:** `QueryEndpoint` fetches data from a provided endpoint and passes the results to other components to display or process. - it can be found on App.js



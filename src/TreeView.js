import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import axios from "axios";
import "./TreeView.css"
import ListApi from "./ListApi";
const TreeView = (file) => {
  const [treeStruct, setTreeStruct] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3010/get_tree_structure");
      console.log(response.data);
      setTreeStruct(response.data);
    }
    catch (error) {
      console.log("Error Occured while Fetching data :", error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // },[]);


  const rootNodeValue = treeStruct && treeStruct.name;

  const removeNullChildren = (node) => {
    if (node === null) {
      return null;
    }
    const newNode = { ...node };
    if (newNode.children) {
      newNode.children = newNode.children.filter(child => child !== null);
      newNode.children = newNode.children.map(removeNullChildren);
    }
    return newNode;
  };

  const nodeShapeProps = {
    shape: "square",
    shapeProps: {
      r: 15,
      fill: "green",
      stroke: "#0056b3",
      strokeWidth: 2,
    },
  };
  const treeStyles = {
    width: "100%",
    height: "100vh", // Adjust this to fit the screen
  };

  const cleanedData = removeNullChildren(treeStruct);

  const getTree = () => {
    fetchData();
    const rootNodeValue = treeStruct && treeStruct.name;
    const cleanedData = removeNullChildren(treeStruct);
  };

  return (
    <div className="total">
      <div className="TreeView" style={{ width: '100%', height: '80vh', maxWidth: '100%', }}>
        {rootNodeValue && (
          <Tree 
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf" 
            data={cleanedData} 
            orientation="vertical" non />
        )}
        <button onClick={getTree}>View Tree</button>
      </div>
      <div className="apiHistory">
        <ListApi></ListApi>
      </div>
    </div>
  );

};

export default TreeView;
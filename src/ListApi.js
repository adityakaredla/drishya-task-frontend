// ListApi.js
import React, { useState } from 'react';
import axios from 'axios';
import './ListApi.css'; // Import your CSS file for styling
import Tree from 'react-d3-tree';

const ListApi = () => {
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState(''); 
  const [traversalData , setTraversalData] = useState("");
  const [displayDepth, setDisplayDepth] = useState('');
  const [apiData , setApiData] = useState('');
  const [nodeValue , setNodeValue] = useState('');
  const [subTree, setSubTree] = useState(false);
  const [treeStruct, updateTreeStruct] = useState({});

  const traversal = async (selectedOption) => {
    try {
      if (selectedOption !== "") {
        const response = await axios.get(`http://localhost:3010/${selectedOption}_traversal`);
        setTraversalData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const apiCall = async (selectedOption, nodeValue) => {
    try {
      if (selectedOption !== "") {
        if (selectedOption != "tree_till_all_leaves"){
        const response = await axios.get(`http://localhost:3010/get_${selectedOption}/${nodeValue}`);
        setApiData(response.data);
        }
        else{
          const response = await axios.get(`http://localhost:3010/get_${selectedOption}/${nodeValue}`);
          updateTreeStruct(response.data);}
        }
      }
    catch (error) {
      console.error(error);
    }
  };

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(selectedValue);
    traversal(selectedValue);
  };

  const handleApiChange = () => {
    apiCall(selectedOption2, nodeValue);
  };

  const handleSelectedOption2 = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption2(selectedOption);
    setSubTree(true);
  };

  const handleNodeValue = (event) => {
    const NodeValue = event.target.value;
    setNodeValue(NodeValue);
    console.log(nodeValue);
  };

  const handleDepth = async (event) => {
    const depthValue = event.target.value;
    if (depthValue === "") {
      setDisplayDepth("");
    } else {
      try {
        const response = await axios.get(`http://localhost:3010/get_depth/${depthValue}`);
        setDisplayDepth(response.data);
      } catch (error) {}
    }
  };

  return (
    <div className="api-container">
      <h3>Traversal:</h3> 
      <select value={selectedOption1} onChange={handleDropdownChange}>
        <option value="">Select Traversal</option>
        <option value="preorder">PreOrder Traversal</option>
        <option value="inorder">InOrder Traversal</option>
        <option value="postorder">PostOrder Traversal</option>
      </select>
      <div className="traversal-data">
        { traversalData }
      </div>
      <div className="depth">
        <h3>Depth:</h3>
        <input type='text' placeholder="Enter Node" onChange={handleDepth}></input>
        <p>{displayDepth}</p>
      </div>
      <h3>Tree Operations:</h3> 
      <select value={selectedOption2} onChange={handleSelectedOption2}>
        <option value="">Select Operation</option>
        <option value="parent">Get Parent Node</option>
        <option value="children">Get Children Nodes</option>
        <option value="tree_till_parent">Path from Node to Root</option>
        <option value="peers">Get Peer Nodes</option>
        <option value="tree_till_all_leaves">Get Sub Tree</option>
      </select>
      <input type='text' placeholder="Enter node value" value={nodeValue} onChange={handleNodeValue}></input>
      <div className="api-data">
        {apiData}
      </div>
      <button onClick={handleApiChange}>Get</button>
      <div className="TreeView" style={{ width: '100%', height: '60vh', maxWidth: '90%', }}>
          <Tree 
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf" 
            data={treeStruct} 
            orientation="vertical" non />
      </div>
    </div>
  );
};

export default ListApi;

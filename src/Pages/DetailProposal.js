import React, { useEffect, useState } from "react";
import { Input, Card, Avatar, Button,message } from "antd";
import "./DetailProposal.css";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import abi from "../contract.js"
const {Web3} = (window);
//import * as PushAPI from "@pushprotocol/restapi";

const DetailProposal = () => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [phase1Status, setPhase1Status] = useState(false);
  const [phase2Status, setPhase2Status] = useState(false);
  const [dealverified, setDealverified] = useState(false);
  const location = useLocation();
  const [comment, setComment] = useState("");
  const [ethaddress,setEth] = useState("");

  useEffect(() => {
    (async () => {
      /*const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );*/
      //await provider.send("eth_requestAccounts", []);
      //const signer = provider.getSigner();
    })();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddComment = () => {
    setComments([...comments, comment]);
    setComment("");
  };
  const handleVote = async () => {
    const web3 =  new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    let contract =  new web3.eth.Contract(abi,"0x9156ecC4bA06eC3BdB696c4DCA5676D147CeB8C5")
      
    if(phase1Status){

      let ans = await contract.methods.vote2(location.state.id).send({ from: accounts[0] });
      
    }else{
      let ans = await contract.methods.vote(location.state.id).send({ from: accounts[0] });
      
    }
    message.success('Proposal submitted successfully!');




  }
  useEffect(() => {
    setTitle(location.state.title);
    setDealverified(location.state.isdealverified);
    setPhase1Status(location.state.phase1Approved);
    setPhase2Status(location.state.phase2Approved);
    async function ethsetup(){
      await window.ethereum.enable();
    const web3 =  new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    setEth(accounts[0]);
    }
    ethsetup()
    console.log("the phase one status is ",location.state.phase1approved)
  }, [location.state]);

  return (
    <div className="p-8">
      <Card className="bg-white rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="flex mb-4">
          <Button
          onClick={handleVote}
            type="primary"
            className="p-2 btn-blue rounded-full flex justify-center py-2 items-center"
            disabled = {!((!phase1Status && !location.state.votes) || (!phase2Status && !location.state.votes2 && location.state.isdealverified)) }
          >
            Vote
          </Button>
          <Button
            type="primary"
            className="p-2 btn-blue rounded-full ml-2 flex justify-center py-2 items-center"
            disabled={!((ethaddress == location.state.proposer) && (phase1Status && !dealverified))}
          >
            Sample Data
          </Button>
        </div>
        <hr size="10" className="my-4 border-solid border-dotted" />
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            {phase1Status ? (
              <Avatar className="bg-green-500" size={24}>
                1
              </Avatar>
            ) : (
              <Avatar size={24}>1</Avatar>
            )}
            <span className="ml-2 font-medium">Phase 1 approved</span>
          </div>
          <div
            style={{ height: 2 }}
            className="my-4 flex-1 border-solid border-dotted border-2 mx-2"
          />
          <div className="flex items-center">
            {(dealverified) ? (
              <Avatar className="bg-green-500" size={24}>
                2
              </Avatar>
            ) : (
              <Avatar size={24}>2</Avatar>
            )}
            <span className="ml-2 font-medium">Data uploaded</span>
          </div>
          <div
            style={{ height: 2 }}
            className="my-4 flex-1 border-solid border-dotted border-2 mx-2"
          />
          <div className="flex items-center">
            {(phase2Status) ? (
              <Avatar className="bg-green-500" size={24}>
                3
              </Avatar>
            ) : (
              <Avatar size={24}>3</Avatar>
            )}
            <span className="ml-2 font-medium">Phase 2 approved</span>
          </div>
        </div>
        <Card className="bg-white rounded-lg p-4">
          <Input
            className="mb-4"
            placeholder="Add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            onClick={handleAddComment}
            type="primary"
            className="p-2 btn-blue rounded-full flex justify-center py-2 items-center "
          >
            Add Comment
          </Button>
        </Card>
        {comments.map((c, i) => (
          <Card key={i} className="bg-white rounded-lg p-4 mt-4">
            <h3 className="text-lg font-bold">Name</h3>
            <p className="text-base font-medium">{c}</p>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default DetailProposal;

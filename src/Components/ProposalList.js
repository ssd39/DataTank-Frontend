import React, { useState, useEffect } from "react";
import { Card, Typography, Space } from "antd";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "react-loading-skeleton/dist/skeleton.css";
const { Title } = Typography;

const ProposalCard = ({ proposal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if(proposal){
      navigate("/proposal", { state: proposal });
    }
  };
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <Card
        hoverable
        className="w-96 my-3 cursor-pointer"
        style={{
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <Title level={6} className="underline decoration-sky-500 select-none">
          {proposal ? proposal.title : <Skeleton />}
        </Title>
        <Space direction="vertical" size={12}>
          <div className="text-2xl select-none font-semibold underline decoration-pink-500">
            {proposal ? (
              <div>Proposed by: {proposal.proposer}</div>
            ) : (
              <Skeleton width={150} />
            )}
          </div>
          <div className="text-xl font-medium select-none">
            {proposal ? <div>Amount: {proposal.amount}</div> : <Skeleton />}
          </div>
          <Space className="flex justify-between" direction="horizontal">
            <div className="text-lg font-medium select-none">
              {proposal ? (
                <div>Vote Phase: {proposal.votePhase}</div>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
            <div className="text-lg font-medium select-none">
              {proposal ? (
                <div>Vote Count: {proposal.voteCount}</div>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </Space>
        </Space>
      </Card>
    </motion.div>
  );
};

const ProposalList = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  //const web3 = useWeb3();

  useEffect(() => {
    // Fetch the proposals using Web3.js
    const fetchProposals = async () => {
      //const contract = new web3.eth.Contract(ABI, contractAddress);
      const proposalCounter = 5; // await contract.methods.proposalCounter().call();
      const proposals = [];
      for (let i = 0; i < proposalCounter; i++) {
        const proposal = {
          title: "dwij",
          proposer: "0x0039023",
          amount: "100",
          votePhase: "1",
          voteCount: 10,
        }; //await contract.methods.proposals(i).call();
        proposals.push({
          title: proposal.title,
          proposer: proposal.proposer,
          amount: proposal.amount,
          votePhase: proposal.votePhase,
          voteCount: proposal.voteCount,
        });
      }
      setProposals(proposals);
      setLoading(false);
    };
    setTimeout(() => {
      fetchProposals();
    }, 10000);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full">
        <ProposalCard />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {proposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  );
};

export default ProposalList;

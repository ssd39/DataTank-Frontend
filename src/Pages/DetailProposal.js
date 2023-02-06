import React, { useEffect, useState } from "react";
import { Input, Card, Avatar, Button } from "antd";
import "./DetailProposal.css"
import { useLocation } from 'react-router-dom'; 

const DetailProposal = () => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [phase1Status, setPhase1Status] = useState(false);
  const [phase2Status, setPhase2Status] = useState(false);
  const [uploadPhaseStatus, setUploadPhaseStatus] = useState(false);
  const location = useLocation();
  const [comment, setComment] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddComment = () => {
    setComments([...comments, comment]);
    setComment("");
  };

  useEffect(() => {
    setTitle(location.state.title)
  },[location.state])

  return (
    <div className="p-8">
      <Card className="bg-white rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="flex mb-4">
          <Button type="primary" className="p-2 btn-blue rounded-full flex justify-center py-2 items-center" >
            Vote
          </Button>
          <Button
          type="primary"
            className="p-2 btn-blue rounded-full ml-2 flex justify-center py-2 items-center"
            disabled
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
            {uploadPhaseStatus ? (
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
            {phase2Status ? (
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

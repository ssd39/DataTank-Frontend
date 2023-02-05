import React, { useState } from "react";
import { Input, Card, Avatar, Button } from "antd";

const Tweet = () => {
  const [title, setTitle] = useState("asdasd asas");
  const [comments, setComments] = useState([]);
  const [phase1Status, setPhase1Status] = useState(false);
  const [comment, setComment] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddComment = () => {
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div className="p-8">
      <Card className="bg-white rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="flex mb-4">
          <Button className="bg-blue-500 text-white p-2 rounded-full">
            Vote
          </Button>
          <Button
            className="bg-gray-500 text-white p-2 rounded-full ml-2"
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
            {phase1Status ? (
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
            {phase1Status ? (
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
            className="bg-blue-500 text-white p-2 rounded-full"
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

export default Tweet;

import React, { useState } from "react";
import { Form, Input, message, Button, Spin, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./SubmitProposal.css";

const tags = ["Financial Data", "Pollution Data", "Stock Data", "Health Data"];

function SubmitProposal() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagSelect = (tag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const handleTagClose = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title) {
      return message.error("Title is required");
    }
    if (!selectedTags.length) {
      return message.error("At least one tag is required");
    }

    if (!amount.match(/^\d+$/)) {
      message.error("Amount must be a positive integer");
      return;
    }
    setLoading(true);

    const proposalData = { title, tags };
    const proposalDataJson = JSON.stringify(proposalData);

    try {
      /*const result = await ipfs.add(Buffer.from(proposalDataJson));
      const proposalDataIpfsCID = result[0].hash;
      const accounts = await web3.eth.getAccounts();
      await Contract.methods.submitProposal(0, proposalDataIpfsCID).send({ from: accounts[0] });*/
      setLoading(false);
      message.success('Proposal submitted successfully!');
    } catch (err) {
      setLoading(false);
      message.error(err.message);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <Form className="bg-white p-10 rounded-lg shadow-lg">
        <Form.Item>
          <Input
            className="w-full border font-bold border-gray-400 rounded-lg rounded-full"
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            className="w-full border font-bold border-gray-400 rounded-lg rounded-full"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Item>
        <Form.Item>
          {selectedTags.map((tag) => (
            <Tag
              key={tag}
              className="mr-2 mb-2 font-bold rounded-full"
              closable
              onClose={() => handleTagClose(tag)}
            >
              {tag}
            </Tag>
          ))}
          <Input
            placeholder="Tags"
            className="w-full font-bold border border-gray-400 rounded-lg rounded-full"
            suffix={<PlusOutlined />}
            onPressEnter={(event) => handleTagSelect(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="w-full flex justify-center py-2 items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg "
            onClick={handleSubmit}
          >
            {loading ? (
              <Spin size="small" />
            ) : (
              <span className="font-bold text-xl">Submit Proposal</span>
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SubmitProposal;

export const createPrediction = async (req, res) => {
  const { message } = req.body;
  console.log(message);

  try {
    // Call the Flowise API endpoint here..
    const flowiseData = {
      question: message,
    };

    // Call the Flowise API Endpoint
    const response = await fetch(
      `${process.env.FLOWISE_URL}/api/v1/prediction/${process.env.FLOW_ID}`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLOWISE_API_KEY}`
        },
        body: JSON.stringify(flowiseData),
      }
    );

    console.log(response.status);
    const text = await response.text();
    console.log(text);

    try {
      const data = JSON.parse(text);
      console.log(data);
      res.status(200).json({ message: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
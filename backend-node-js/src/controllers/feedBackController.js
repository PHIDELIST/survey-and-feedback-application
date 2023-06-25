import sql from 'mssql';
import config from '../db/config.js';

export const sendFeedback = async (req, res) => {
    const { feedbackType, feedbackText } = req.body;
    try {
        await sql.connect(config.sql);
        const request = new sql.Request();
        request.input('FeedbackType', sql.NVarChar(255), feedbackType);
        request.input('FeedbackText', sql.NVarChar(sql.MAX), feedbackText);

        await request.query('INSERT INTO Feedback (FeedbackType, FeedbackText) VALUES (@FeedbackType, @FeedbackText)');
        res.status(200).send('Feedback submitted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error submitting feedback');
    }finally{
        sql.close();
    }
};
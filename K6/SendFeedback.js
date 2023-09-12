import http  from "k6/http";
export const options = {
    stages: [
        {duration: '5s', target: 10}
    ]
};

export default function () {
    const url = 'http://localhost:8081/feedback'
    const payload = JSON.stringify({
        FeedbackType: 'thumbs up',
        FeedbackText:'heloo wolrd'
    });
    const params = {
        header: {
            'Content-Type' : 'application/json',
        },
    };
    http.post(url,payload,params)

}
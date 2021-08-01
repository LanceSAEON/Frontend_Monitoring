module.exports = {
    getAllLogs: [
        {
            '$project': { 
                'clientSession': 1,
                'clientInfo': 1,
                'type': 1,
                'createdAt': 1,
                'info':1
            }
        }, {
            '$sort': { 'clientSession': 1 }
        }],
    clickLogs: [
        {
            '$project': { 
                'clientSession': 1,
                'clientInfo': 1,
                'type': 1,
                'createdAt': 1,
                'info':1
            }
        }, {
            '$sort': { 'clientSession': 1 }
        }, { 
            '$match': { 'type': 'click' } 
        }],
    downloadLogs: [
        {
            '$project': { 
                'clientSession': 1,
                'clientInfo': 1,
                'type': 1,
                'createdAt': 1,
                'info':1
            }
        }, {
            '$sort': { 'clientSession': 1 }
        }, { 
            '$match': { 'type': 'download' } 
        }],
    mouseMoveLogs: [
        {
            '$project': { 
                'clientSession': 1,
                'clientInfo': 1,
                'type': 1,
                'createdAt': 1,
                'info':1
            }
        }, {
            '$sort': { 'clientSession': 1 }
        }, { 
            '$match': { 'type': 'mousemove' } 
        }],
    queryLogs: [
        {
            '$project': { 
                'clientSession': 1,
                'clientInfo': 1,
                'type': 1,
                'createdAt': 1,
                'info':1
            }
        }, {
            '$sort': { 'clientSession': 1 }
        }, { 
            '$match': { 'type': 'query' } 
        }]
}
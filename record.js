class Record {
    static create(req, res) {
        const { artist, title, genre } = req.body
       
        return Record
            .create({
                artist,
                title,
                genre
            })
            .then(record => res.status(201).send({
                message: `Your record with the title ${title} has been created successfully `,
                record
            }))
    }

    static list(req, res) {
        return Record
            .findAll()
            .then(records => res.status(200).send(records));
    }

    static delete(req, res) {
        return Record
            .find(req.params.title)
            .then(record => {
                if (!record) {
                    return res.status(400).send({
                        message: 'Record Not Found',
                    });
                }
                return record
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Record successfully deleted'
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error))
    }
}


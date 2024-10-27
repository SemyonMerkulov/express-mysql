const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, products, totalPages, currentPage };
};

exports.create = (req, res) => {
	const { 
		title,
		part_number,
		sell_price,
		discount_price,
		description,
		image_url
	} = req.body

	if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

	const product = {
		title,
		part_number,
		sell_price,
		discount_price,
		description,
		image_url,
	}

	Product.create(product)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Server error"
			});
		});
}

exports.findAll = (req, res) => {
	const { sort, title, page, size } = req.query

	const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
	const order = sort ? [(sort.charAt(0) !== '-') ? [sort, 'ASC'] : [sort.replace('-', ''), 'DESC']] : null

	const { limit, offset } = getPagination(page, size);

	Product.findAndCountAll({ 
		where: condition,
		order,
		limit,
		offset,
	})
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Server error."
      });
    });
}

exports.findOne = (req, res) => {
  const id = req.params.id;

	Product.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Product with id=${id}.`
				});
			}
		})
		.catch(_ => {
			res.status(500).send({
				message: `Error retrieving Product with id=${id}.`
			});
		});
}

exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Product with id=${id}.`
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Product with id=${id}`
      });
    });
};

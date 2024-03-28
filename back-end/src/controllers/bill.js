const Bill = require('../models/bill')
const mongodb = require('mongodb')
const { ObjectId } = mongodb

exports.createBill = async (req, res, next) => {
  try {
    const bill = new Bill({ ...req.body })
    await bill.save()
    res.status(201).send(bill)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getBills = async (req, res, next) => {
  try {
    const bills = await req.user.getBills()
    res.json(bills)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getBill = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id)
    res.status(200).send(bill)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getBillsInGroup = async (req, res, next) => {
  try {
    const bills = await req.user.getBillsInGroup(req.params.id)
    res.status(200).send(bills)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.updateBill = async (req, res, next) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, { ...req.body })
    res.status(200).send(bill)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.deleteBill = async (req, res, next) => {
  try {
    const bill = await Bill.deleteOne({ _id: new ObjectId(req.params.id) })
    res.status(200).send(bill)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.deleteBills = async (req, res, next) => {
  try {
    const bills = await Bill.deleteMany({ _id: { $in: req.body.bills.map((id) => new Object(id)) } })
    res.status(200).send(bills)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getLoans = async (req, res, next) => {
  try {
    const groups = await req.user.getGroups()
    const groupIds = groups.map(({ _id }) => _id)

    const loans = await Bill.aggregate([
      {
        $unwind: '$payers'
      },
      {
        $match: { group: { $in: groupIds }, status: 'pending' }
      },
      {
        $lookup: {
          from: 'groups',
          localField: 'group',
          foreignField: '_id',
          as: 'group'
        }
      },
      {
        $unwind: '$group'
      },
      {
        $project: {
          name: '$group.name',
          groupId: '$group._id',
          price: '$price',
          group: {
            $map: {
              input: '$group.users',
              as: 'user',
              in: {
                $cond: [
                  { $eq: ['$$user.userId', '$payers'] },
                  { $mergeObjects: ['$$user', { price: '$price' }] },
                  { $mergeObjects: ['$$user', { price: 0 }] }
                ]
              }
            }
          }
        }
      },
      {
        $unwind: '$group'
      },
      {
        $group: {
          _id: { groupId: '$groupId', userId: '$group.userId' },
          price: { $sum: '$group.price' }
        }
      },
      {
        $group: {
          _id: '$_id.groupId',
          users: {
            $push: {
              userId: '$_id.userId',
              price: '$price'
            }
          }
        }
      },
      {
        $addFields: {
          totalPrice: { $sum: '$users.price' },
          users: {
            $map: {
              input: '$users',
              as: 'user',
              in: {
                userId: '$$user.userId',
                loan: {
                  $add: [
                    '$$user.price',
                    {
                      $multiply: [{ $divide: [{ $sum: '$users.price' }, { $size: '$users' }] }, -1]
                    }
                  ]
                }
              }
            }
          }
        }
      },

      {
        $addFields: {
          loaners: {
            $map: {
              input: '$users',
              as: 'user',
              in: {
                userId: {
                  $cond: [{ $eq: ['$$user.userId', req.user._id] }, 1, null]
                }
                // loan: {
                //   $add: [
                //     '$$user.price',
                //     {
                //       $multiply: [{ $divide: [{ $sum: '$users.price' }, { $size: '$users' }] }, -1]
                //     }
                //   ]
                // }
              }
            }
          }
        }
      }
    ])

    res.status(200).send(loans)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

import UserModel from "../models/users.js";

const getUser = async (req, res) => {
    try {
        const { id } = req.params

        const foundUser = await UserModel.findById(id)

        if (!foundUser) return res.status(404).json({ msg: "User not found..!" })

        return res.status(200).json(foundUser)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const friendsList = async (req, res) => {
    try {
        const { id } = req.params
        const foundUser = await UserModel.findById(id)

        if (!foundUser.friends) {
            return res.status(404).json({ msg: "No friends found." });
        }
        
        const friends = await Promise.all(
            foundUser.friends.map(id => UserModel.findById(id))
        )

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, imgLink }) => {
                return { _id, firstName, lastName, occupation, location, imgLink }
            }
        )

        return res.status(200).json(formattedFriends)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const addRemoveFriends = async (req, res) => {
    try {
        const { id, friendId } = req.params
        const foundUser = await UserModel.findById(id)
        const foundFriend = await UserModel.findById(friendId)

        if (foundUser.friends.includes(friendId)) {
            foundUser.friends = foundUser.friends.filter(fID => fID !== friendId)
            foundFriend.friends = foundFriend.friends.filter(fID => fID !== id)
        } else {
            foundUser.friends.push(friendId)
            foundFriend.friends.push(id)
        }

        await foundUser.save();
        await foundFriend.save();

        const friends = await Promise.all(
            foundUser.friends.map(id => UserModel.findById(id))
        )

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, imgLink }) => {
                return { _id, firstName, lastName, occupation, location, imgLink }
            }
        )

        return res.status(200).json(formattedFriends)

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export {getUser, friendsList, addRemoveFriends}
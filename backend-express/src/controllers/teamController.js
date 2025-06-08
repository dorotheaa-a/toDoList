const Team = require('../models/Team');
const { create } = require('../models/User');

// for teams
exports.createTeam = async (req, res) => {
    try {
        const team = new Team({
            name: req.body.name,
            createdBy: req.user._id,
            members: [{
                user: req.user._id,
                isLeader: true,
            }],
        });

        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addTeamMember = async (req, res) => {
    try {
        const team = await Team.findOne({
            _id: req.params.teamId,
            'members.user': req.user._id,
        });

        if (!team) {
            return res.status(404).send();
        }

        team.members.push({
            user: req.body.userId,
            isLeader: req.body.isLeader || false,
        });

        await team.save();
        res.json(team);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
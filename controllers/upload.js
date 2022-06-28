const uploadFile = require('../helpers/upload-file');

const loadFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      msg: "No hay archivo adjunto",
    });
  }

  try {
    const name = await uploadFile(req.files, 'users');
    res.json({
        name
    });
  } catch (error) {
    res.json({
        msg: error
    });
  }

}

const updateImage = (req, res) => {
    const { colection, id } = req.params;

    res.json({
        colection,
        id
    })
}

module.exports = {
    loadFile,
    updateImage
};

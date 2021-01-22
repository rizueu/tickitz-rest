// ===== Response
module.exports = (res, status, success, message, results, ...optionalProperty) => {
  const [prevPageLink, nextPageLink] = optionalProperty
  if (results.length > 1) {
    res.status(status).json({
      success,
      message,
      results,
      pageInfo: {
        totalData: results.length,
        previousPageLink: optionalProperty ? prevPageLink : null,
        nextPageLink: optionalProperty ? nextPageLink : null
      }
    })
  } else if (typeof results === 'object') {
    res.status(status).json({
      success,
      message,
      results
    })
  } else {
    res.status(status).json({
      success,
      message
    })
  }
}

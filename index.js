/**
 * @file 邮件
 * @author r2space@gmail.com
 * @module light.bridge.mail
 * @version 1.0.0
 */


"use strict";

var nodemailer  = require("nodemailer")
  , config      = light.framework.config
  , helper      = light.framework.helper
  , instance    = undefined
  ;

function transporter() {

  if (instance) {
    return instance;
  }

  instance = nodemailer.createTransport(config.mail);
  return instance;
}

/**
 * 发送邮件
 * @param {object} message 邮件
 * @param {Function} callback 回调函数
 */
exports.sendMail = function(message, callback) {
  transporter().sendMail(message, function(err, info){
    if(err){
      return callback(err);
    }

    return callback(err, info);
  });
};

/**
 * 生成消息内容
 * @param {string} from 发信人
 * @param {string} to 收信人
 * @param {string} subject 标题
 * @param {string} template 内容模板（EJS格式）
 * @param {object} values 内容值
 * @returns {object} object
 * @returns {string} object.from 发信人
 * @returns {string} object.to 收信人
 * @returns {string} object.subject 标题
 * @returns {string} object.html 内容
 */
exports.createMessage = function(from, to, subject, template, values) {

  var content = helper.ejsParser(template, values);
  return {
      from: from
    , to: to
    , subject: subject
    , html: content
    };
};

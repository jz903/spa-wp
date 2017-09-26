import React, { PureComponent } from 'react'
import { number, object, func } from 'prop-types'
import { Form, Input, Button, message, Row, Col } from 'antd'

import './index.css'

class Contact extends PureComponent {
  static propTypes = {
    pageId: number.isRequired,
    form: object.isRequired,
    submitComment: func.isRequired,
  }

  handleSubmit = e => {
    e.preventDefault()

    const { pageId, form, submitComment } = this.props

    form.validateFields((err, values) => {
      if (!err) {
        const { companyName, phoneNum, commentType,
          productType, productList, content, ...rest } = values
        const moreContent =
        `Tel: ${phoneNum}<br>
        Comment: ${content}`

        submitComment({
          post: pageId,
          content: moreContent,
          ...rest,
        }).then(({ response }) => {
          if (response) {
            message.success('Thanks for your comment.')
            form.resetFields()
          }
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <div className="container">
          <Row>
            <Col sm={24} md={12}>
              <Form
                onSubmit={this.handleSubmit}
                className="contact-form"
              >
                <Form.Item label="Name">
                  {getFieldDecorator('author_name', {
                    rules: [{
                      required: true, message: 'Please input your name.',
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
                <Form.Item label="Email">
                  {getFieldDecorator('author_email', {
                    rules: [{
                      type: 'email', message: 'Not a valid email address',
                    }, {
                      required: true, message: 'Please input your email.',
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
                <Form.Item label="Tel">
                  {getFieldDecorator('phoneNum', {
                    rules: [{
                      required: true, message: 'Please input your phone number.',
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
                <Form.Item label="Message">
                  {getFieldDecorator('content', {
                    rules: [{
                      required: true, message: 'Please input your comment message',
                    }],
                  })(
                    <Input.TextArea rows={4} />,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button size="large" type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Form.create()(Contact)

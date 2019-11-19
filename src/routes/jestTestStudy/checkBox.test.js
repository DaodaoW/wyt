import React from 'react';
import ReactDOM from 'react-dom';
// import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { CheckBox } from './checkBox';

/**
 * describe中，提供了测试用例的四个钩子：beforeALL()、afterAll()、beforeEach()、afterEach()
 * 它们会在指定的时间执行；
 */
describe('Component CheckBox test', () => {
  beforeAll(() => {
    console.log('在本区块的所有测试用例之前执行');
  });
  afterAll(() => {
    console.log('在本区块的所有测试用例之后执行');
  });
  test('CheckBox changes the text after click', () => {
    const checkbox = TestUtils.renderIntoDocument(<CheckBox labelOn='On' labelOff='Off' />);
    const checkboxNode = ReactDOM.findDOMNode(checkbox);
    expect(checkboxNode.textContent).toEqual('Off');
    TestUtils.Simulate.change(
      TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
    )
    expect(checkboxNode.textContent).toBe('On');
  });
  beforeEach(() => {
    console.log('在本区块的每个测试用例之前执行');
  });
  afterEach(() => {
    console.log('在本区块的每个测试用例之后执行');
  });
  /**
   * 测试例子：
   * test('should have a title', function() {
   *   var title = helpers.findByTag(this.Modal, 'h2');
   *   assert.equal(findDOMNode(title).firstChild.nodeValue, 'whatever');
   * });
   *
   * test('should have child content', function() {
   *   var content = helpers.findByClass(this.Modal, 'm-content');
   *   assert.equal(findDOMNode(content).nodeName.toLowerCase(), 'div');
   * });
   *
   * test('should have child paragraph', function() {
   *   var text = helpers.findByClass(this.Modal, 'm-text');
   *   assert.equal(findDOMNode(text).firstChild.nodeValue, 'Just some noddy content');
   * });
   */
});

/**
 * 单元测试的作用：
 *     保证代码质量（随着迭代的过程，开发人员很难记清所有的功能点，功能点的新增和删除在代码改变后，进行回归测试时，依靠人工QA很容易出错遗漏）；
 *     自动化测试（通过编写测试用例，同样的测试不需要从头再来一遍，节约测试时间）；
 *     特性文档（可以通过阅读测试用例来看项目实现的所有需求，有时候比直接看需求文档来的更加清晰）；
 *     测试驱动开发TDD（在开发时要保证每个功能都是可以做单元测试的，测试迁移（TDD）就是这个作用）；
 * 单元测试的类型： 
 *    单元测试（于凯模拟输入证实是否是期望的输出来分别的测试函数或者类）；
 *    集成测试（测试若干模块来确保他们像预期的那样工作）；
 *    功能测试（在产品本身（例如浏览器上）对一个场景进行操作，而不考虑内部结构以确保预期的行为）；
 * 单元测试技术的实现原理：
 *    测试框架（判断内部是否存在异常，存在就console出对应的异常信息）；
 *    断言库；
 *    mock函数；
 * 写单元测试的建议：
 *    只考虑测试，不考虑内部实现；
 *    不做无谓的断言；
 *    每个单元测试保持独立；
 *    充分考虑数据的便捷条件；
 *    对重点、复杂、核心代码重点测试；
 *    利用AOP（beforeEach、afterEach）减少测试代码数量、避免无用功能；
 *    使用最合适的断言方式；
 */

 /**
  * jest的简单语法：
  *   1.匹配器： 
  *     toBe--精确匹配，toBe用的是jS中的Object.is(),属于es6特性，所以不能检测对象；
  *     toEqual--检测对象，可递归检查对象或者数组中的每个字段；
  *     toBeNull--只匹配null；
  *     toBeUndefined--只匹配undefined；
  *     toBeDefine--与ToBeUndefined相反；
  *     toBeTruthy--匹配任何if语句为真；
  *     toBeFalsy--匹配任何if为假的语句；
  *     toBeGreaterThan--数字匹配器大于；
  *     toBeGreaterThanOrEqual--大于或等于；
  *     toBeLessThan--小于；
  *     toBe和toEqual同样适用于数字（在对比两个浮点数是否相等的时候，使用toBeCloseTo而不是toEqual）；
  *     toMatch--测试字符串，传递的参数是正则表达式；
  *     toContain--检测数组中是否包含特定某一项；
  *     toThrow--在测试特定函数的时候抛出一个错误；
  *   2.测试异步代码：
  *     回调--function fetchData(call) {
                setTimeout(() => {
                  call('peanut butter1')
                },1000);
              }

              test('the data is peanut butter', (done) => {
                function callback(data) {
                  expect(data).toBe('peanut butter');
                  done(); 使用单个参数调用done，而不是将测试放在一个空函数的参数中，jest会等done回调函数执行结束后，结束测试
                }
                fetchData(callback);
              });
        promise--只要从测试中返回一个Promise，Jest就会等待这个Promise来解决：
                  test('the data is peanut butter', () => {
                    expect.assertions(1);
                    return fetchData().then(data => {
                      expect(data).toBe('peanut butter');
                    });
                  });
        .resovles/.rejects--可以使用匹配器匹配期望的声明：
                            test('the data is peanut butter', () => {
                              expect.assertions(1);
                              return expect(fetchData()).resolves.toBe('peanut butter');
                            });
                            test('the fetch fails with an error', () => {
                              expect.assertions(1);
                              return expect(fetchData()).rejects.toMatch('error');
                            });
        Async/Await--只要在函数前面使用ansync传递到test：
                      test('the fetch fails with an error', async () => {
                        expect.assertions(1);
                        try {
                          await fetchData();
                        } catch (e) {
                          expect(e).toMatch('error');
                        }
                      });
  */


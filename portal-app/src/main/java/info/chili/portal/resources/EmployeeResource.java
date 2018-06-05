/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package info.chili.portal.resources;

import info.chili.portal.dao.EmployeeRepository;
import info.chili.portal.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author k26758
 */
@RestController
@Scope("request")
public class EmployeeResource {

    public static final String ROOT_URI = "/employees";
    @Autowired
    EmployeeRepository employeeRepository;

    @PostMapping(ROOT_URI)
    public void save(@RequestBody @Validated Employee employee) {
        employeeRepository.save(employee);
    }

    @GetMapping(ROOT_URI)
    public Page<Employee> queryAll(@RequestParam(name = "page", defaultValue = "0") Integer page, @RequestParam(name = "size", defaultValue = "10") Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return employeeRepository.findAll(pageRequest);
    }

    @GetMapping((ROOT_URI) + "/{id}")
    public Employee find(@PathVariable("id") Long entityId) {
        return employeeRepository.findById(entityId).get();
    }

    @DeleteMapping((ROOT_URI) + "/{id}")
    public void delete(@PathVariable("id") Long id) {
        employeeRepository.deleteById(id);
    }
}

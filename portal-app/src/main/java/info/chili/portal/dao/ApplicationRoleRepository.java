/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package info.chili.portal.dao;

import info.chili.portal.entity.ApplicationRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author k26758
 */
@Repository
public interface ApplicationRoleRepository extends JpaRepository<ApplicationRole, Long> {

    ApplicationRole findByRoleName(String roleName);

}

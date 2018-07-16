/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package info.chili.portal.entity;

import info.chili.jpa.AbstractAuditEntity;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author ayalamanchili
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Employee extends AbstractAuditEntity {

    @NotEmpty
    protected String firstName;
    @NotEmpty
    protected String lastName;

    @Temporal(TemporalType.DATE)
    protected Date dob;
    @Email
    protected String email;

}

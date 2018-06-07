/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package info.chili.commons.search;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author k26758
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchCriteria {

    protected String key;
    protected String operation;
    protected Object value;
}

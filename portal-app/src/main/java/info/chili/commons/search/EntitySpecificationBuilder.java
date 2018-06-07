/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package info.chili.commons.search;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

/**
 *
 * @author k26758
 */
public class EntitySpecificationBuilder {

    private final List<SearchCriteria> params;

    public EntitySpecificationBuilder() {
        params = new ArrayList<>();
    }

    public EntitySpecificationBuilder with(String key, String operation, Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }

    public Specification build() {
        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = new ArrayList<>();
        for (SearchCriteria param : params) {
            specs.add(new EntitySpecification(param));
        }

        Specification result = specs.get(0);
        for (int i = 1; i < specs.size(); i++) {
            result = Specifications.where(result).and(specs.get(i));
        }
        return result;
    }
}
